import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, User } from "lucide-react";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList>
        <TabsTrigger value="info">
          <User className="w-4 h-4 mr-2" />
          Хувийн мэдээлэл
        </TabsTrigger>
        <TabsTrigger value="password">
          <Lock className="w-4 h-4 mr-2" />
          Нууц үг солих
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
export default ProfileTabs;
