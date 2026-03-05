import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

const ReviewForm = ({
  rating,
  setRating,
  hoverRating,
  setHoverRating,
  text,
  setText,
  handleSubmit,
  submitting,
  onCancel,
}) => {
  return (
    <Card className="mb-6 shadow bg-gray-700/50 border-none text-white">
      <CardContent className="p-3 ">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="mb-2 block">Үнэлгээ</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`w-6 h-6 md:w-8 md:h-8 transition ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Сэтгэгдэл</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Таны санал..."
              rows={4}
              maxLength={500}
              className="text-sm md:text-base"
            />
            <p className="text-xs md:text-sm text-muted-foreground">
              {text.length}/500
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Илгээж байна..." : "Илгээх"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="text-black"
            >
              Болих
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default ReviewForm;
