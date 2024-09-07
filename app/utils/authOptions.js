// import clientPromise from "@/app/utils/db";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
    // adapters: MongoDBAdapter(clientPromise,{}),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ]
}

export default authOptions