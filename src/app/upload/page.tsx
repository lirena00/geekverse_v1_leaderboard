import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import Header from "~/components/Header";

export default function UploadPage() {
  return (
    <main className="flex flex-col gap-8">
      <Header />
      <div className="flex flex-col gap-4 px-4">
        <h1 className="self-start text-2xl font-semibold">Upload Teams</h1>
        <div className="flex w-[450px] flex-col gap-4 self-center">
          <Textarea placeholder="Enter team's name here" />
          <Button>Send message</Button>
        </div>
      </div>
    </main>
  );
}
