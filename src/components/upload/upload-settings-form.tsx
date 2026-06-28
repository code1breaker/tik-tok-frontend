import { useAppDispatch, useAppSelector } from "@/src/hooks/store";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Field, FieldContent, FieldGroup, FieldLabel } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { setUploadForm } from "@/src/lib/store/upload-slice";

export default function UploadSettingsForm() {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.upload.form);

  return (
    <div className="space-y-2">
      <p>Settings</p>
      <Card>
        <CardContent>
          <form className="space-y-5">
            {/* When to Post*/}
            <RadioGroup
              defaultValue="now"
              className="w-fit flex gap-5"
              onValueChange={(value) => {
                dispatch(setUploadForm({ settings: { postTiming: value } }));
              }}
            >
              <Field orientation="horizontal">
                <RadioGroupItem value="now" id="desc-r1" />
                <FieldContent>
                  <FieldLabel htmlFor="desc-r1">Now</FieldLabel>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="schedule" id="desc-r2" />
                <FieldContent>
                  <FieldLabel htmlFor="desc-r2">Schedule</FieldLabel>
                </FieldContent>
              </Field>
            </RadioGroup>

            {/* Who can watch this video */}
            <Field className="w-xs">
              <FieldLabel htmlFor="desc-r1">
                Who can watch this video
              </FieldLabel>
              <Select
                defaultValue="everyone"
                onValueChange={(value) => {
                  dispatch(setUploadForm({ settings: { visibility: value } }));
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="friends">Friends</SelectItem>
                    <SelectItem value="you">You</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            {/* Allow users to: */}
            <FieldGroup className="gap-3">
              <FieldLabel htmlFor="desc-r1">Allow users to:</FieldLabel>
              <Field orientation="horizontal">
                <Checkbox
                  id="comments"
                  name="comments"
                  defaultChecked
                  onCheckedChange={(checked) => {
                    dispatch(
                      setUploadForm({
                        settings: { interaction: { comments: checked } },
                      }),
                    );
                  }}
                />
                <FieldLabel htmlFor="comments" className="w-fit font-normal">
                  Comments
                </FieldLabel>
              </Field>

              <Field orientation="horizontal">
                <Checkbox
                  id="likes"
                  name="likes"
                  defaultChecked
                  onCheckedChange={(checked) => {
                    dispatch(
                      setUploadForm({
                        settings: { interaction: { likes: checked } },
                      }),
                    );
                  }}
                />
                <FieldLabel htmlFor="likes" className="w-fit font-normal">
                  Likes
                </FieldLabel>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
