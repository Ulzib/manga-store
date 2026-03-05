import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

const ProfilePasswordForm = ({
  passwordData,
  setPasswordData,
  loading,
  onSubmit,
}) => {
  return (
    <Card className="bg-gray-700/40 border-none text-white">
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Одоогийн нууц үг</Label>
            <Input
              type="password"
              value={passwordData.currentPassword}
              className="border border-gray-600"
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Шинэ нууц үг</Label>
            <Input
              type="password"
              className="border border-gray-600"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Нууц үг давтах</Label>
            <Input
              type="password"
              className="border border-gray-600"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
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
              "Нууц үг солих"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default ProfilePasswordForm;
