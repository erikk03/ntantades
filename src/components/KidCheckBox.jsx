import React from "react";
import { Checkbox, User, Chip, cn } from "@nextui-org/react";

// Helper function to calculate age or months
const calculateAgeOrMonths = (birthdate) => {
  if (!birthdate) return 'N/A';
  const birthDateObj = new Date(birthdate);
  const today = new Date();

  // Calculate the total difference in months
  const totalMonths = (today.getFullYear() - birthDateObj.getFullYear()) * 12 + (today.getMonth() - birthDateObj.getMonth());

  // Check if the person is less than 1 year old
  if (totalMonths < 12) {
    return `${totalMonths} Μηνών`;
  }

  // Calculate age in years
  let age = Math.floor(totalMonths / 12);
  return `${age}  Ετών`;
};

export const KidCheckbox = ({ user, statusColor, value }) => {
  const ageOrMonths = calculateAgeOrMonths(user?.birthdate);

  return (
    <Checkbox
      aria-label={user.name}
      classNames={{
        base: cn(
          "inline-flex max-w-lg bg-content1 m-0 mr-4",
          "hover:bg-content3 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-1 border-1 border-transparent",
          "data-[selected=true]:border-danger",
        ),
        label: "w-full",
      }}
      value={value}
    >
      <div className="w-full flex justify-between items-center gap-5">
        <User
          avatarProps={{ size: "md", src: user?.avatar }}
          name={`${user?.name ?? ''} ${user?.surname ?? ''}`}
        />
        <div>
          <span className="text-tiny text-default-500">{user?.AT}</span>
        </div>

        <Chip color={statusColor} size="sm" variant="flat">
          {ageOrMonths !== 'N/A' ? ageOrMonths : 'N/A'}
        </Chip>
      </div>
    </Checkbox>
  );
};
