import React from "react";
import {Checkbox, Link, User, Chip, cn} from "@nextui-org/react";

export const KidCheckbox = ({user, statusColor, value}) => {
  return (
    <Checkbox
      aria-label={user.name}
      classNames={{
        base: cn(
          "inline-flex max-w-sm bg-content1 m-0 mr-4",
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
          avatarProps={{size: "md", src: user?.avatar}}
          name={`${user?.name ?? ''} ${user?.surname ?? ''}`}
        />
        <div>
          <span className="text-tiny text-default-500">{user?.AT}</span>
        </div>

        <Chip color={statusColor} size="sm" variant="flat">
            {user.birthdate}
        </Chip>
      </div>
    </Checkbox>
  );
};