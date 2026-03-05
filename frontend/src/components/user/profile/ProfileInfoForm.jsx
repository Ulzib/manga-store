import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Mail, User } from "lucide-react";

const ProfileInfoForm = ({
  profileData,
  setProfileData,
  loading,
  onSubmit,
}) => {
  return (
    <Card className="bg-gray-700/40 border-none text-white">
      <CardContent className="p-6 ">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Нэр *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10 border border-gray-600 text-sm md:text-base"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>И-мэйл *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                className="pl-10 border border-gray-600 text-sm md:text-base"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors text-[12px] md:text-sm"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                <Spinner />
              </>
            ) : (
              "Хадгалах"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default ProfileInfoForm;
