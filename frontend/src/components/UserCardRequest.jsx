import React from 'react';

const UserCardRequest = ({ request, onAccept, onReject }) => {
  return (
    <div className="bg-[#111] text-white border-2 border-white rounded-3xl p-4 flex items-center justify-between w-full max-w-[868px] mx-auto shadow-md mt-4">
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 border-2 border-white rounded-full flex items-center justify-center text-2xl font-bold uppercase bg-gray-800">
          {request.name?.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">{request.name}</h2>
          <p className="text-green-400 text-sm">
            Skills Offered =&gt;{' '}
            <span className="inline-block border border-white px-3 py-1 rounded-full text-xs">
              {request.offeredSkill}
            </span>
          </p>
          <p className="text-blue-400 text-sm mt-2">
            Skill Wanted =&gt;{' '}
            <span className="inline-block border border-white px-3 py-1 rounded-full text-xs">
              {request.wantedSkill}
            </span>
          </p>
          <p className="text-sm mt-4">Rating <strong>{request.rating}/5</strong></p>
        </div>
      </div>

      <div className="text-right flex flex-col gap-4 items-end mt-4 sm:mt-0">
        <p className="text-lg font-medium">
          Status <span className="text-gray-400 ml-2">{request.status}</span>
        </p>
        {request.status === "Pending" && (
          <div className="flex gap-4">
            <button onClick={() => onAccept(request.id)} className="text-green-400 text-lg hover:underline">Accept</button>
            <button onClick={() => onReject(request.id)} className="text-red-400 text-lg hover:underline">Reject</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCardRequest;