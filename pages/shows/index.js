import Link from "next/link";

// Dsc: [Task 2]: [SSR |Server Side Rendering] 
// [Task 3]: Static Routing Page
export default function ShowsTvMaze(props){
    let { data } = props;

    return (
        <>
            <ul className={'w-full flex items-center justify-center'}>
                {
                    data.map((item)=>{
                        return (
                            <li key={`${item.id}`} className={'bg-gray-200 rounded-xl p-4 space-y-6'}>
                                <h1>{item.name}</h1>
                                <div>
                                    <Link href={`/shows/${item.id}`}>
                                        <span className={'text-blue'}>Detail</span>
                                    </Link>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export async function getServerSideProps(){
    let data = [];

    await fetch("https://api.tvmaze.com/shows")

        .then((response) => response.json())
        .then((response) => {
            data = response
        }).catch(err =>{

            data = [];
            console.log(`[Error |fetch shows]\nCaused:${err.message}`);
        })

    return {
        props: {
            data
        }
    }
}