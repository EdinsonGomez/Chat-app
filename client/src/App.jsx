import Chat from "./components/chat/Chat";
import Users from "./components/users/Users";
import NicknameForm from "./components/NicknameForm";

function App() {
  return (
    <main className="h-full">
      <NicknameForm />
      <div className="w-full h-full flex divide-x-2 divide-slate-100">
        <div className="basis-1/5">
          <Users />
        </div>
        <div className="basis-4/5">
          <Chat />
        </div>
      </div>
    </main>
  )
}

export default App