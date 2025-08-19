import { auth } from "@/auth";
import SearchBar from "../../components/SearchBar";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home( {searchParams } : {searchParams: Promise<{ query?: string}>}) {

  const query = (await searchParams).query;

  const params = {search : query || null}

  const session = await auth()
  console.log(session?.id)

  const {data: posts} = await sanityFetch({ query: STARTUP_QUERY, params});

  console.log(JSON.stringify(posts, null,2 ))

  return (
    <>

      <section className="blue_container pattern">
        <h1 className="heading">
          Pitch Your Dream <br /> Connect With Opportunities
        </h1>

        <p className="sub-heading !max-w-3xl">
          Pitch Your Vision, Vote for Bold Ideas, and Shine in the Global
          Spotlight
        </p>

        <SearchBar query={query}/>
      </section>

      <section className="section_container">
        
        <p className="text-30-semibold">
          {query ? `Search Results for ${query}:` : "All Startups:"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post:StartupTypeCard) => (
              <StartupCard key={post?._id} post = {post}/>
            ))
          ) : (
            <p className="no-results">No Startups</p>
          )}
        </ul>

      </section>

      <SanityLive/>
    </>
  );
}