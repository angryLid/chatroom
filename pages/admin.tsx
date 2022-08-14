export default function () {
  return (
    <div>
      <div className="bg-slate-100 flex w-screen">
        <label htmlFor="secret w-1/6">SECRET</label>
        <input
          className="bg-inherit outline-none w-5/6 ml-4"
          type="text"
          id="secret"
          value="387r2hefuindkvsjnksjdghlkdsjfklsddjflkssjdlkfjdslkjflskdjflksjflksjlkfjdsklj"
        />
      </div>
      <div>
        <label htmlFor="room-id">Room ID</label>
        <input type="text" id="room-id" placeholder="847-382-838" />
        <button>Create</button>
      </div>
      <div>
        <label htmlFor="passwd">Password</label>
        <input type="text" id="passwd" placeholder="847-382-838" />
        <button>Create</button>
      </div>
    </div>
  );
}
