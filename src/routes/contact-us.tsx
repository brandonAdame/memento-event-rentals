import { Button } from "@heroui/react";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { TextInput, Textarea } from "@mantine/core";

export const Route = createFileRoute("/contact-us")({
  component: RouteComponent,
});

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextInput,
    Textarea,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      orderNumber: "",
      description: "",
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });
  return (
    <div className="page-wrap px-4 mt-10">
      <div className="flex flex-col items-center gap-10">
        <h1 className="display-title text-6xl font-bold">Contact us</h1>
        <p className="text-base text-(--sea-ink-soft) sm:text-lg">
          Have a question about our vintage and antique event rentals? Get in
          touch with the Memento Event Rentals team today. We serve weddings,
          photo shoots, corporate events, and private gatherings in
          Raleigh-Durham and surrounding areas. Fill out the form below or reach
          us directly — we typically respond within 24 hours.
        </p>

        <div className="min-w-160">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.AppField
              name="name"
              children={(field) => (
                <field.TextInput
                  size="md"
                  label="Name"
                  placeholder="Enter your name"
                  withAsterisk
                />
              )}
            />
            <form.AppField
              name="email"
              children={(field) => (
                <field.TextInput
                  size="md"
                  label="Email"
                  placeholder="Enter your email"
                  withAsterisk
                />
              )}
            />
            <form.AppField
              name="orderNumber"
              children={(field) => (
                <field.TextInput size="md" label="Order number" />
              )}
            />
            <form.AppField
              name="description"
              children={(field) => (
                <field.Textarea
                  size="md"
                  label="Description"
                  placeholder="What can we do for you?"
                  withAsterisk
                />
              )}
            />
            <form.AppForm>
              <form.Button type="submit">Submit</form.Button>
            </form.AppForm>
          </form>
        </div>
      </div>
    </div>
  );
}
