import { createFileRoute } from '@tanstack/react-router'

function MeetingRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#fdf7fb] px-4 py-10">
      <div className="mx-auto w-full max-w-[576px] rounded-2xl bg-white/80 p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-pink-700">
          線上會議報名表
        </h1>

        <p className="text-sm text-gray-600">
          這裡先放頁面骨架，下一步再接表單欄位。
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/MeetingRegistration')({
  component: MeetingRegistrationPage,
})