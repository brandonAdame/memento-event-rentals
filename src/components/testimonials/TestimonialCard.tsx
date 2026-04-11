import { Card, Group, Text } from "@mantine/core";

interface TestimonialCardProps {
  name: string;
  review: string;
}
export default function TestimonialCard({
  name,
  review,
}: TestimonialCardProps) {
  return (
    <Card
      shadow="sm"
      padding={"lg"}
      radius={20}
      withBorder
      className="w-80 h-48 flex flex-col justify-between shrink-0 mr-4"
    >
      <Group justify="space-between">
        <Text size="xl">{name}</Text>
      </Group>
      <Text size="sm" c="dimmed" className="flex-1 overflow-hidden">
        {review}
      </Text>
    </Card>
  );
}
