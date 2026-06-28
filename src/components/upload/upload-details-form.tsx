import { setUploadForm } from "@/src/lib/store/upload-slice";
import { Card, CardContent } from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import UploadCover from "./upload-cover";
import { useAppDispatch, useAppSelector } from "@/src/hooks/store";

export default function UploadDetailsForm() {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.upload.form);

  return (
    <div className="space-y-2">
      <p>Details</p>
      <Card>
        <CardContent>
          <form className="space-y-5">
            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="Type your Description here."
                value={form?.details?.description}
                onChange={(e) => {
                  const description = e.target.value;
                  dispatch(setUploadForm({ details: { description } }));
                }}
              />
            </Field>

            {/* Cover */}
            <Field className="w-xs">
              <FieldLabel htmlFor="cover">Cover</FieldLabel>
              <UploadCover />
            </Field>

            {/* Location */}
            <Field className="w-xs">
              <FieldLabel htmlFor="location">Location</FieldLabel>

              <Select
                defaultValue="india"
                value={form?.details?.location}
                onValueChange={(value) => {
                  dispatch(setUploadForm({ details: { location: value } }));
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
