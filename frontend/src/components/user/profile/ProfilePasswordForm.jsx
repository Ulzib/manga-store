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
    <Card>
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Одоогийн нууц үг</Label>
            <Input
              type="password"
              value={passwordData.currentPassword}
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
          <Button type="submit" disabled={loading} className="w-full">
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
