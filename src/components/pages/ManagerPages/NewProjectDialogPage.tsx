import { Button, Dialog, Field, Input, Portal, Stack, UseDisclosureProps } from "@chakra-ui/react";
import { useRef } from "react";

type NewProjectDialogPageProps = {
    disclosure: UseDisclosureProps
}

const NewProjectDialogPage = ({ disclosure }: NewProjectDialogPageProps) => {
    const ref = useRef<HTMLInputElement>(null)

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
                                        <Field.Label>First Name</Field.Label>
                                        <Input className="border pl-2" placeholder="First Name" />
                                    </Field.Root>
                                </Stack>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
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