import { FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { commentCreate } from "../../features/blog/blogSlice";
import IComment from "../../models/IComment";
import { Box, TextField, Button } from "@mui/material";

type Props = Pick<IComment, "postId">;

const FormComment: FC<Props> = ({ postId }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data: Omit<IComment, "id">) => {
    dispatch(commentCreate({ ...data, postId }));
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      margin='auto'
      sx={{ "> *": { margin: 0.8 } }}
      component='form'
      maxWidth='sm'
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextField
        required
        multiline
        size='small'
        error={errors.body?.type === "required"}
        label='Comment'
        {...register("body", { required: true, value: "" })}
      />
      <Button type='submit' variant='contained'>
        Leave a comment
      </Button>
    </Box>
  );
};

export default FormComment;
