import React from "react";

import { Avatar, AvatarBoringFallback } from "@/components-ui-lib/avatar";

const AvatarBoringDemo = () => (
    <div className="grid grid-cols-3 gap-4">
      <Avatar>
        <AvatarBoringFallback name="Amelia Earhart" variant="marble" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Amelia Earhart" variant="beam" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Amelia Earhart" variant="sunset" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Mary Roebling" variant="marble" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Mary Roebling" variant="beam" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Mary Roebling" variant="sunset" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Maud Nathan" variant="marble" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Maud Nathan" variant="beam" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Maud Nathan" variant="sunset" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Mary Shelley" variant="marble" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Mary Shelley" variant="beam" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Mary Shelley" variant="sunset" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Mary Wollstonecraft" variant="marble" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Mary Wollstonecraft" variant="beam" />
      </Avatar>
      <Avatar>
        <AvatarBoringFallback name="Mary Wollstonecraft" variant="sunset" />
      </Avatar>
    </div>
);

export { AvatarBoringDemo };
