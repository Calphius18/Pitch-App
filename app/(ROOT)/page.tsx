import { title } from "process";
import SearchBar from "../../components/SearchBar";
import StartupCard from "@/components/StartupCard";

export default async function Home( {searchParams } : {searchParams: Promise<{ query?: string}>}) {

  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date(),
    views: 18,
    author: { _id: 1, name: "Caliphus"},
    _id: 1,
    description: "This is the description",
    image:"https://teamninja-studio.com/ng2black/assets/img/top_kv_image@sp.jpg",
    category: "Ninja Chronicles",
    title:" Ninja Assassin",

  }]

  return (
    <>

      <section className="pink_container pattern">
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
            posts.map((post: StartupTypeCard, ) => (
              <StartupCard key={post?._id} post = {post}/>
            ))
          ) : (
            <p className="no-results">No Startups</p>
          )}
        </ul>

      </section>
    </>
  );
}