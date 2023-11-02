import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FileUploaderProps = {
  fieldName: string;
  label: string;
};

const FileUploader: React.FC<FileUploaderProps> = ({ fieldName, label }) => {
  const { setValue, watch } = useFormContext();
  const { t } = useTranslation();
  const files: File[] = watch(fieldName);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setValue(fieldName, [...files, file]);
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <label
        htmlFor={fieldName}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div
        {...getRootProps()}
        className='p-2 cursor-pointer'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23156BE5FF' stroke-width='2' stroke-dasharray='12%2c 5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
      >
        <input {...getInputProps()} />
        <p className='text-sm'>{t("Product.Images.DragAndDrop")}</p>
      </div>
      {!!files?.length && (
        <div className='grid gap-1 grid-cols-4 mt-2'>
          {files.map((file) => {
            return (
              <div key={file.name}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
