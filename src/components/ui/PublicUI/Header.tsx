import { Breadcrumb } from "@chakra-ui/react";
import { Avatar, HStack, Stack, Text } from "@chakra-ui/react"

const users = [
    {
        id: "1",
        name: "K N P J Ananda",
        email: "iit22049@std.uwu.ac.lk",
        avatar: "https://i.pravatar.cc/300?u=iu",
    },
]

const Header = () => {
    return (
        <div className="px-6 py-4 top-0 sticky z-10 flex justify-between bg-gray-100 border-b items-center">
            <div>
                <Breadcrumb.Root>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            </div>
            <Stack gap="8">
                {users.map((user) => (
                    <HStack key={user.email} gap="4" textStyle="sm">
                        <Avatar.Root>
                            <Avatar.Fallback name={user.name} />
                            <Avatar.Image src={user.avatar} />
                        </Avatar.Root>
                        <Stack gap="0">
                            <Text fontWeight="medium">{user.name}</Text>
                            <Text color="fg.muted" textStyle="xs">
                                {user.email}
                            </Text>
                        </Stack>
                    </HStack>
                ))}
            </Stack>
        </div>
    );
};

export default Header;