import { useState } from "react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./CustomDatePicker.css";

const CustomDatePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleFocus = (e) => {
    e.target.select();
    e.target.setSelectionRange(0, 0);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={value ? dayjs(value) : null}
          onChange={onChange}
          disableFuture
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          maxDateTime={dayjs()}
          slotProps={{
            textField: {
              variant: "standard",
              fullWidth: true,
              InputProps: {
                readOnly: true,
              },
              onClick: handleClick,
              onFocus: handleFocus,
            },
          }}
          className="input"
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
