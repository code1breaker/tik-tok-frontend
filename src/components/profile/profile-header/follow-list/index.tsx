import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import FollowUserList from "./follow-user-list";

export interface FollowListPropIf {
  trigger?: React.ReactNode;
}

export default function FollowList({ trigger }: FollowListPropIf) {
  const params = useParams();
  const username = params.username as string;

  return (
    <Dialog>
      <DialogTrigger>{trigger ?? <>Open</>}</DialogTrigger>
      <DialogContent className="p-0 max-w-120! h-140 grid-rows-[auto_1fr] ">
        <DialogHeader className="p-4">
          {/* Username */}
          <DialogTitle className="text-center">@{username}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="following">
          {/* Tabs List */}
          <TabsList variant="line" className="w-full p-0">
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="follower">Follower</TabsTrigger>
            <TabsTrigger value="suggested">Suggested</TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="following" className="px-4">
            <FollowUserList variant="following" username={username} />
          </TabsContent>
          <TabsContent value="follower" className="px-4">
            <FollowUserList variant="follower" username={username} />
          </TabsContent>
          <TabsContent value="suggested" className="px-4">
            <FollowUserList variant="suggested" username={username} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
