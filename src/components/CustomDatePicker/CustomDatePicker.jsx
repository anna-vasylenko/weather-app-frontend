import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
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
        <DatePicker
          value={dayjs(value)}
          onChange={onChange}
          disableFuture={true}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
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
          maxDate={dayjs().endOf("day")}
          className="input"
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
