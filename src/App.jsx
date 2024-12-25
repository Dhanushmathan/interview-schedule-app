import { useForm } from "react-hook-form";
import FormInput from './components/FormInput';
import FormTextArea from "./components/FormTextArea";
import FormSelect from "./components/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const formSchema = z.object({
  jobRole: z.string().nonempty("Please select a job role"),
  fullName: z.string().nonempty("Please enter your full name").min(3, "Name must be at least 3 characters").max(25, "Name must be at most 25 characters"),
  emailAddress: z.string().email("Please enter a valid email address"),
  address: z.string().nonempty("Please enter your address"),
  qualification: z.string().nonempty("Please enter your qualification"),
  comments: z.string().nonempty("Please enter your comments"),
});

const App = () => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm({ resolver: zodResolver(formSchema) });

  const [candidates, setCandidates] = useState();

  const COLLECTION_NAME = "candidates";

  const sentThisToBackend = async (data) => {
    // Every validation passed, send data to the backend
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
      console.log("Document written with ID: ", docRef.id);
      alert("Added as you requested");
    } catch (e) {
      console.error("Error adding doucment:", e);
    };

    reset();
  }

  useEffect(() => {
    // fetch data from the backend
    async function getDataFirebase() {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

      setCandidates(querySnapshot.docs.map((doc) => doc.data()))

      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`, doc.data());
      // });

      if (querySnapshot.docs.length === 0) {
        console.log("No such document!");
      }
    }
    getDataFirebase();
  })

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-amber-500 px-10 py-5 text-lg text-center font-semibold">Interview Scheduled Candidates</header>
      <main className="container mx-auto my-5 pb-5">
        <section className="bg-white p-5 rounded shadow">
          <h2 className="font-semibold text-lg">Interview Scheduled Candidates</h2>

          <form className="space-y-5 mt-5" onSubmit={handleSubmit(sentThisToBackend)}>

            <FormSelect name="jobRole" register={register("jobRole")} error={errors.jobRole} />

            <FormInput name="fullName" label="Full Name" placeholder="Full Name" register={register("fullName")} error={errors.fullName} />

            <FormInput name="emailAddress" label="Email Address" placeholder="Email Address" register={register("emailAddress")} error={errors.emailAddress} />

            <FormTextArea name="address" label="Enter your Address" placeholder="Address" register={register("address")} error={errors.address} />

            <FormTextArea name="qualification" label="Enter your Qualification" placeholder="Qualification" register={register("qualification")} error={errors.qualification} />

            <FormTextArea name="comments" label="Enter your Suggestion" placeholder="Comments" register={register("comments")} error={errors.comments} />

            <button className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white">Submit</button>

          </form>
        </section>

        {/* Display values here */}
        <section className="bg-white p-5 mt-2 rounded shadow">
          <div className="relative overflow-x-auto rounded">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-20">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    JobRole
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qualification
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates && candidates.map((candidate, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="px-6 py-4">{index + 1}</th>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {candidate.fullName}
                    </th>
                    <td className="px-6 py-4">{candidate.emailAddress}</td>
                    <td className="px-6 py-4">{candidate.jobRole}</td>
                    <td className="px-6 py-4">{candidate.qualification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>

      </main>
    </div>
  )
}

export default App;