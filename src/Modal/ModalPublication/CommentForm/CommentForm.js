import React from "react";
import "./CommentForm.css";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../gql/comment";
export default function CommentForm(props) {
  const { publication } = props;
  const [addComment] = useMutation(ADD_COMMENT);
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await addComment({
          variables: {
            input: {
              idPublication: publication.id,
              comment: formData.comment,
            },
          },
        });

        formik.handleReset();
      } catch (error) {}
    },
  });
  return (
    <Form className="comment-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Pon un comentario..."
        name="comment"
        input={{ style: { height: "60px", backgroundColor: "yellow" } }}
        onChange={formik.handleChange}
        value={formik.values.comment}
        error={formik.errors.comment && true}
      />
      <Button type="submit">Publicar</Button>
    </Form>
  );
}
