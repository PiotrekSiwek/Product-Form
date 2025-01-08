import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, ReactElement } from "react";
import Select from 'react-select'
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Notify } from "./Toast";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import Spinner from "react-bootstrap/Spinner";
import { Button, Container, Form } from "react-bootstrap";
import Editor from "./Editor";
import { productOptions } from "../data/productOptions";
import { formSchema, FormData } from "../models/formSchema";
import { selectStyles } from "../styles/creatableSelectStyles";

import "../styles/formAppStyles.css";
import "quill/dist/quill.snow.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

function FormApp(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { productTitle: "" },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "productBulletsPoints",
  });

  const watchFieldArray = watch("productBulletsPoints");

  const [editorValue, setEditorValue] = useState<string>("");
  const [showNotify, setShowNotify] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const quillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue("description", editorValue);
  }, [editorValue, setValue]);

  const onSubmit = (data: FormData) => {
    console.log("data", data);
    simulateApiResponse();
  };
  const closeNotify = () => {
    setShowNotify(false);
    window.location.reload();
  };

  const handleDrag = ({ source, destination }: DropResult) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  const simulateApiResponse = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowNotify(true);
    }, 2000);
  };

  return (
    <div className="content-wrapper">
      <Container className="responsive-height">
        <Container className="content-bg">
          <Container className="p-2 bg-primary ">
            <h2 className="pb-1 text-center text-white">
              <i className="bi bi-box m-3"></i>
              Add Product
            </h2>
            <h6 className="text-center text-white fst-italic">
              Provide details of the product you want to sell!
            </h6>
          </Container>
          <Notify showNotify={showNotify} closeNotify={closeNotify} />
          <Container className="p-4 mb-4 bg-white mt-3">
            <Form>
              <Form.Group className="mb-4" controlId="productTitle">
                <Form.Label>Product Title</Form.Label>
                <Controller
                  name="productTitle"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Product Title"
                      isInvalid={!!errors.productTitle}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.productTitle?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4" controlId="description">
                <Form.Label>Description</Form.Label>
                <div>
                  <Editor ref={quillRef} setEditorValue={setEditorValue} />
                  <input type={"hidden"} {...register("description")} />
                </div>
              </Form.Group>
              <Form.Group className="mb-4" controlId="productKeywords">
                <Form.Label>Product Status</Form.Label>
                <Controller
                  name="productStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="productStatus-creatable"
                      {...field}
                      isClearable
                      styles={selectStyles}
                      options={productOptions}
                      value={
                        productOptions.find(
                          (option) => option.value === field.value,
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        field.onChange(
                          selectedOption ? selectedOption.value : null,
                        );
                      }}
                      placeholder="Product Status"
                    />
                  )}
                />
              </Form.Group>
              <Container className="mb-2 d-flex justify-content-between align-items-center">
                <Form.Label>Product Bullet Points</Form.Label>
                <Button
                  className="py-0 px-2"
                  style={{ height: "30px" }}
                  onClick={() => {
                    append({
                      bulletPoint: "",
                    });
                  }}
                >
                  <i className="bi bi-plus-lg"></i>
                </Button>
              </Container>
              <DragDropContext onDragEnd={handleDrag}>
                <ul className="list-unstyled p-0">
                  <Droppable droppableId="productBulletsPoints-bulletPoint">
                    {(provided, _snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {fields.map((item, index) => {
                          return (
                            <Draggable
                              key={`productBulletsPoints[${index}]`}
                              draggableId={`bulletPoint-${index}`}
                              index={index}
                            >
                              {(provided, _snapshot) => (
                                <li
                                  className="mb-1"
                                  key={item.id}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <Container className="d-flex justify-content-between align-items-center">
                                    <div
                                      className="d-flex align-items-center text-primary drag-btn"
                                      {...provided.dragHandleProps}
                                    >
                                      <i className="bi bi-grip-vertical"></i>
                                    </div>
                                    <Controller
                                      name={`productBulletsPoints.${index}.bulletPoint`}
                                      control={control}
                                      render={({ field }) => (
                                        <Form.Control
                                          {...field}
                                          type="text"
                                          className="input-bottom-border"
                                          placeholder="add bullet point"
                                          onBlur={() => {
                                            if (
                                              watchFieldArray[index]
                                                .bulletPoint === ""
                                            ) {
                                              remove(index);
                                            }
                                          }}
                                        />
                                      )}
                                    />
                                    <Button
                                      className="bin-btn py-0 px-2"
                                      onClick={() => {
                                        remove(index);
                                      }}
                                    >
                                      <i className="bi bi-trash3-fill"></i>
                                    </Button>
                                  </Container>
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </ul>
              </DragDropContext>
            </Form>
            <Container className="justify-content-center d-flex">
              <Button
                variant="primary"
                type="submit"
                className="mt-5 button-blue"
                onClick={handleSubmit(onSubmit)}
                style={{width: '150px'}}
              >
                {isSubmitted && (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "10px" }}
                  />
                )}

                {isSubmitted ? "Submitting" : "Submit"}
              </Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default FormApp;
