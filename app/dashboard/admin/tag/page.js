import TagCreate from "@/components/tag/TagCreate";
import TagList from "@/components/tag/TagList";

export default function AdminTag() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <p className="lead">Create tags</p>
          <TagCreate />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="lead">List of tags</p>
          <TagList />
        </div>
      </div>
    </div>
  );
}
