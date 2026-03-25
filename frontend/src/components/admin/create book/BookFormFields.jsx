import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookFormFields = ({ form, categories }) => {
  return (
    <div className="w-full h-auto pl-18 space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Номын нэр</FormLabel>
            <FormControl>
              <Input placeholder="Номын нэрийг оруулна уу" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Зохиолч</FormLabel>
            <FormControl>
              <Input placeholder="Зохиолчийн нэрийг оруулна уу" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Үнэ (₮)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Үнийг оруулна уу" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Категори</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Категори сонгох" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Тайлбар</FormLabel>
            <FormControl>
              <Textarea placeholder="Type your message here." {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default BookFormFields;
