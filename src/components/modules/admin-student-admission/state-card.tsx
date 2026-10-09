//   <div className="grid gap-4 sm:grid-cols-3">
//         {[
//           {
//             label: "Total Applications",
//             value: applications.length,
//             style: "text-orange-600 bg-orange-50",
//           },
//           {
//             label: "Pending Applications",
//             value: applications.filter((a) => a.status === "PENDING").length,
//             style: "text-amber-600 bg-amber-50",
//           },
//           {
//             label: "Approved Applications",
//             value: applications.filter((a) => a.status === "APPROVED").length,
//             style: "text-emerald-600 bg-emerald-50",
//           },
//         ].map((item) => (
//           <div
//             key={item.label}
//             className="rounded-xl border bg-white p-5 shadow-sm"
//           >
//             <p className="text-sm text-slate-500">{item.label}</p>
//             <p className="mt-2 text-3xl font-bold text-slate-900">
//               {item.value}
//             </p>
//             <div
//               className={`mt-3 inline-flex rounded-md px-2 py-1 text-xs font-medium ${item.style}`}
//             >
//               Admission Overview
//             </div>
//           </div>
//         ))}
//       </div>