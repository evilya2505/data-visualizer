import React from "react";
import { MuiFileInput } from "mui-file-input";
import { Controller, useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";

import { useDispatch } from "../../services/hooks";
import { setNewData } from "../../services/actions/data";

const CustomFileReader = () => {
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      file: null,
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const files = data.file;

    if (files.length && window.FileReader) {
      Array.from(files).forEach((file) => {
        const type = file.name.includes("I") ? "I" : "U";
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          const result = text
            .split(/[\r\n]+/g)
            .map((line) =>
              line.split("	").map((value) => value.replace(/,/g, "."))
            );

          dispatch(setNewData(result, type, file.name));
        };
        reader.readAsText(file);
      });
    } else {
      console.log("error");
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={{
          validate: (files) =>
            Array.from(files).every((file) => file instanceof File),
        }}
        render={({ field, fieldState }) => {
          return (
            <MuiFileInput
              {...field}
              placeholder="Выберите файлы"
              helperText={
                fieldState.invalid ? "Произошла ошибка. Попробуйте снова." : ""
              }
              multiple
              error={fieldState.invalid}
              onChange={(e) => field.onChange(e)}
            />
          );
        }}
        name="file"
      />
      <Box>
        <Button
          disabled={!formState.dirtyFields.file}
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Загрузить
        </Button>
      </Box>
    </form>
  );
};

export default CustomFileReader;
