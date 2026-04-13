import { contactFormSchema, useAppForm } from "#/hooks/contact-us.form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact-us")({
  component: RouteComponent,
});

function RouteComponent() {
  const contactForm = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      orderNumber: "",
      description: "",
    },
    validators: {
      onChange: contactFormSchema,
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
              contactForm.handleSubmit();
            }}
            className="space-y-5"
          >
            <contactForm.AppField
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
            <contactForm.AppField
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
            <contactForm.AppField
              name="orderNumber"
              children={(field) => (
                <field.TextInput size="md" label="Order number" />
              )}
            />
            <contactForm.AppField
              name="description"
              children={(field) => (
                <field.Textarea
                  size="md"
                  resize="vertical"
                  label="Description"
                  placeholder="What can we do for you?"
                  withAsterisk
                />
              )}
            />
            <contactForm.AppForm>
              <contactForm.Button type="submit">Submit</contactForm.Button>
            </contactForm.AppForm>
          </form>
        </div>
      </div>
    </div>
  );
}
