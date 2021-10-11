import { FC } from "react";
import IPost from "../../models/IPost";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postCreate, postUpdate } from "../../features/blog/blogSlice";
import { Box, TextField, Button } from "@mui/material";

type Props = Partial<Omit<IPost, "comments">>;

const PostForm: FC<Props> = ({ id, title, body }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data: Pick<IPost, "title" | "body">) => {
    if (id) {
      dispatch(postUpdate({ ...data, id }));
    } else {
      dispatch(postCreate(data));
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      margin='auto'
      sx={{ "> *": { margin: 1 } }}
      component='form'
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextField
        required
        size='small'
        error={errors.body?.type === "required"}
        label='Post Title'
        {...register("title", { required: true, value: title ?? "New Post" })}
      />
      <TextField
        required
        multiline
        size='small'
        error={errors.body?.type === "required"}
        label='Post Text'
        {...register("body", { required: true, value: body ?? "Post Body" })}
      />
      <Button type='submit' variant='contained'>
        {id ? "Save changes" : "Create new"}
      </Button>
    </Box>
  );
};

export default PostForm;
