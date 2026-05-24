import { useAppDispatch, useAppSelector } from "@/src/hooks/store";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Field, FieldLabel } from "../ui/field";
import { resetUpload } from "@/src/lib/store/uploadSlice";

export default function UploadFileInfo() {
  const file = useAppSelector((state) => state.upload.file);
  const dispatch = useAppDispatch();
  const uploadStatus = useAppSelector((state) => state.upload.uploadStats);
  const { progress, loaded, total } = uploadStatus || {};

  // const handleReplace = () => {
  //   dispatch(resetUpload());
  // };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex justify-between ">
          <div className="space-y-2">
            <p>{file?.name}</p>
            {loaded && total && (
              <p className="text-teal-400 text-xs">
                Uploaded {loaded}/{total}
              </p>
            )}
          </div>
          {/* <Button variant={"secondary"} onClick={handleReplace}>
            Replace
          </Button> */}
        </CardTitle>
      </CardHeader>

      <CardFooter className="p-0 bg-transparent border-none">
        <Field className="w-full">
          <FieldLabel htmlFor="progress-upload" className="px-4">
            <span className="ml-auto">{progress}%</span>
          </FieldLabel>
          <Progress value={progress} className="w-full" />
        </Field>
      </CardFooter>
    </Card>
  );
}
