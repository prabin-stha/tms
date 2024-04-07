import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { createUserParkSlot, updateUserParkSlot } from "@/lib/services/slots";
import { useSlots } from "@/store/slots";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { useSidesheet } from "@/store/sidesheet";
import { Slot } from "@/lib/schema/user";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  price: z.coerce.number().gte(0, "Price must be more than 0"),
  address: z.string().min(8),
  description: z.string().min(2),
  type: z.string(),
  picture: z.instanceof(FileList).nullable(),
});
export type CreateSlot = z.infer<typeof formSchema>;

export function AddSlotSidesheet() {
  const { toast } = useToast();
  const { createSlot, updateSlot } = useSlots(({ createSlot, updateSlot }) => ({
    createSlot,
    updateSlot,
  }));
  const { closeSidesheet, payload } = useSidesheet(
    ({ closeSidesheet, payload }) => ({
      closeSidesheet,
      payload,
    })
  );

  const d = payload && payload?.isEditing ? (payload?.data as Slot) : null;

  const def: CreateSlot = {
    price: d?.price ?? 0,
    address: d?.address ?? "",
    description: d?.description ?? "",
    type: d?.type ?? "Car",
    picture: null,
  };

  const form = useForm<CreateSlot>({
    resolver: zodResolver(formSchema),
    defaultValues: def,
  });

  const onEdit = async (values: CreateSlot) => {
    try {
      const data = payload?.data as Slot;
      const slot = await updateUserParkSlot(data.id, values);
      toast({
        title: "Update Success",
        description: "Slot successfully updated.",
      });
      updateSlot(slot);
      closeSidesheet();
    } catch (err) {
      console.log("err: ", err, values);
      toast({
        title: "Update Failure",
        description: "Error updating slot!",
      });
    }
  };

  const onCreate = async (values: CreateSlot) => {
    try {
      const slot = await createUserParkSlot(values);
      toast({
        title: "Create Success",
        description: "Slot successfully created.",
      });
      createSlot(slot);
      closeSidesheet();
    } catch (err) {
      toast({
        title: "Create Failure",
        description: "Error creating slot!",
      });
    }
  };

  const handleSubmit = async (values: CreateSlot) => {
    if (payload?.isEditing) {
      onEdit(values);
    } else {
      onCreate(values);
    }
  };

  const data = payload?.data as Slot;
  const fileRef = form.register("picture");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(
    data?.picture?.split("/")?.pop() ?? null
  );

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>
          {payload?.isEditing ? "Update" : "Create"} a new parking slot.
        </SheetTitle>
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input required type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        className="resize-none"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <Input
                        className="hidden"
                        type="file"
                        placeholder="profile"
                        {...fileRef}
                        ref={inputFileRef}
                        onChange={(event) => {
                          field.onChange(event.target?.files ?? undefined);
                          setFileName(event.target?.files?.[0].name ?? null);
                        }}
                      />
                    </FormControl>
                    <Input
                      type="button"
                      onClick={() => inputFileRef.current?.click()}
                      value={fileName ?? "Please select a picture"}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your vehicle type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Car">Car</SelectItem>
                        <SelectItem value="Bike">Bike</SelectItem>
                        <SelectItem value="Truck">Truck</SelectItem>
                        <SelectItem value="Van">Van</SelectItem>
                        <SelectItem value="Bus">Bus</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Price (per hr)</FormLabel>
                    <FormControl>
                      <Input required type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </SheetHeader>
    </SheetContent>
  );
}
