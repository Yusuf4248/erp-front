import { groupService } from "@services";
import { useEffect } from "react";

const Group = () => {
  useEffect(() => {
    groupService.getGroups();
  }, []);
  const save = () => {
    const payload = {
      name: "group-1",
      course_id: 1,
      status: "new",
      start_date: "2025-06-01",
      end_date: "2025-09-01",
    };
    groupService.createGroup(payload);
  };
  return (
    <div>
      <h1>Group</h1>
      <button onClick={save}>save</button>
    </div>
  );
};

export default Group;
