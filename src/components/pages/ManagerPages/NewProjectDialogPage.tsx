import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Textarea,
  UseDisclosureProps
} from "@chakra-ui/react";
import { useRef, useState } from "react";

type NewProjectDialogPageProps = {
  disclosure: UseDisclosureProps;
  onProjectCreated: () => void;
};

const NewProjectDialogPage = ({ disclosure, onProjectCreated }: NewProjectDialogPageProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const manager_id = JSON.parse(localStorage.getItem('user') || '{}')?.id;

  const handleCreate = async () => {
    if (!title.trim() || !manager_id) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost/PMS-Backd/api/projects/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: desc,
          manager_id
        })
      });

      const result = await response.json();

      if (result.success) {
        setTitle('');
        setDesc('');
        disclosure.onClose?.();
        onProjectCreated();
      } else {
        alert(result.message || 'Failed to create project.');
      }
    } catch (e) {
      console.error('Error:', e);
      alert('Server error while creating project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog.Root open={disclosure.open} onOpenChange={disclosure.onClose}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Create New Project</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body pb="4">
                <Stack gap="4">
                  <Field.Root>
                    <Field.Label>Project Title</Field.Label>
                    <Input
                      ref={ref}
                      className="border pl-2"
                      placeholder="Enter project title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Textarea
                      className="border pl-2"
                      placeholder="Optional description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </Field.Root>
                </Stack>
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button onClick={handleCreate} loading={loading} colorScheme="green">
                  Save
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
};

export default NewProjectDialogPage;
