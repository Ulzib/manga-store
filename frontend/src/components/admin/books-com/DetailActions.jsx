import { Button } from "@/components/ui/button";

const DetailActions = ({ handleSave, handleDelete }) => {
  return (
    <div className="flex gap-2 mt-4">
      <Button
        className="w-30 bg-indigo-600 text-white hover:bg-indigo-500 rounded-md"
        onClick={handleSave}
      >
        Хадгалах
      </Button>

      <Button
        variant="destructive"
        onClick={handleDelete}
        className="w-30 bg-red-700 text-white hover:bg-red-500 rounded-md"
      >
        Устгах
      </Button>
    </div>
  );
};

export default DetailActions;
