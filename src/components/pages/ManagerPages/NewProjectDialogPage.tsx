import { Button, Dialog, Field, Input, Portal, Stack, UseDisclosureProps } from "@chakra-ui/react";
import { useRef } from "react";

type NewProjectDialogPageProps = {
    disclosure: UseDisclosureProps // Chakra UI's disclosure prop for controlling dialog state
};

const NewProjectDialogPage = ({ disclosure }: NewProjectDialogPageProps) => {
    const ref = useRef<HTMLInputElement>(null); // Optional ref for input focus or manipulation

    return (
        <div>
            {/* Dialog visibility is controlled by `disclosure.open` and closed by `disclosure.onClose` */}
            <Dialog.Root open={disclosure.open} onOpenChange={disclosure.onClose}>
                <Portal>
                    {/* Modal backdrop and positioner */}
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            {/* Dialog header section */}
                            <Dialog.Header>
                                <Dialog.Title>Create New Project</Dialog.Title>
                            </Dialog.Header>

                            {/* Dialog body with form inputs */}
                            <Dialog.Body pb="4">
                                <Stack gap="4">
                                    {/* Example form field */}
                                    <Field.Root>
                                        <Field.Label>First Name</Field.Label>
                                        <Input className="border pl-2" placeholder="First Name" />
                                    </Field.Root>
                                </Stack>
                            </Dialog.Body>

                            {/* Dialog footer with action buttons */}
                            <Dialog.Footer>
                                {/* Closes the dialog when 'Cancel' is clicked */}
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                {/* Save button (functionality can be added later) */}
                                <Button>Save</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </div>
    );
};

export default NewProjectDialogPage;
