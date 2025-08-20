import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";

function DatePickerCombo({ field }: { field: any }) {
  const value = field.value ? dayjs(field.value) : dayjs();

  const [date, setDate] = useState(value.format("YYYY-MM-DD"));
  const [time, setTime] = useState(value.format("HH:mm:ss"));

  const handleDateChange = (newDate: Date) => {
    const newDateObj = dayjs(newDate);
    const [h, m, s] = time.split(":");
    const newDayjs = newDateObj
      .set("hour", Number(h))
      .set("minute", Number(m))
      .set("second", Number(s || 0));
    setDate(newDayjs.format("YYYY-MM-DD"));
    field.onChange(newDayjs.toDate());
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    const [h, m, s] = newTime.split(":");
    const newDayjs = dayjs(date + "T00:00:00")
      .set("hour", Number(h))
      .set("minute", Number(m))
      .set("second", Number(s || 0));
    field.onChange(newDayjs.toDate());
  };

  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="date-picker" className="px-1">
            Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? date : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[250px] overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                required
                selected={dayjs(date).toDate()}
                onSelect={handleDateChange}
                captionLayout="dropdown"
                className="w-full h-84"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-picker" className="px-1">
            Time
          </Label>
          <Input
            type="time"
            id="time-picker"
            step="1"
            value={time}
            onChange={handleTimeChange}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}

export default DatePickerCombo;
