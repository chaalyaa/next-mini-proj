import { useEffect, useState } from "react"

/*Dsc: 
* [Task 2]: [Combining SSG, SSR, & CSR]
* [Task 3]: [Dynamic routing pages]
*/
export default function ShowDetail(props){

    const [ episodes, setEpisode ] = useState([]),
        [ loading, setLoading ] = useState(false),
        [ dataFetch, setFetch ] = useState(false);
    
    // Dsc: [Task 2]: [Fetching data CSR]
    useEffect(()=>{
        if(dataFetch){
            setLoading(true);
            fetch(`https://api.tvmaze.com/shows/${props.id}/episodes`)
                .then((response)=> response.json())
                .then((response)=>{
                    setEpisode(response)
                    setFetch(false)
                    setLoading(false)
                })
                .catch((err)=>{
                    console.log(`[Error |fn useEffect]\nCaused: ${err.messsage}`);
                    setFetch(false)
                    setLoading(false)
                })
        }
    })

    return (
        <div className={'h-full w-full justify-center items-center p-4 rounded-xl bg-gray-200'}>
            <h1>{props.name}</h1>

            <div>
                <h3>Summary:</h3>
                <hr></hr>
                <pre>{props.summary}</pre>
            </div>

            <div>
                <h3>List of episodes:</h3>
                <button className={'btn rounded-xl bg-blue-500 text-white'} 
                        onClick={()=>setFetch(true)}
                        >Show list of episodes</button>
            </div>

            <div>
            <table>
                    <tr>
                        <th>Name of the episodes</th>
                        <th>Summary</th>
                        <th>Rate</th>
                    </tr>
                    {
                        loading ? 'Loading....' :
                        episodes.map((ep) => {
                            return (
                                <tr>
                                    <td>
                                        <span>{ep.name}</span>
                                    </td>
                                    <td>
                                        <span>{ep.summary}</span>
                                    </td>
                                    <td>
                                        <span>{ep.rating.average}</span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

// Dsc: [Task 1]: [Fetching data SSG]
export async function getStaticPaths(ctx){
    let [err, data] = 
        await fetch(`https://api.tvmaze.com/shows`)
                .then((response) => response.json())
                .then((response) =>{
                    return [null, response]
                })
                .catch((err) =>{
                    console.log(`[Error |fn fetch getStaticPaths]\n${"=".repeat(8)}\nCaused: ${err.messsage}`)
                    return [err, null]
                });
    
    if(err){
        return {
            paths: [],
            fallback: false
        }
    }


    let path = [];

    path = data.map((shows) => ({
        params: {
            id: `${shows.id}`
        }
    }));

    return {
        paths: path,
        fallback: false
    }
    
}

export async function getStaticProps(context){
    let { id } = context.params,
        data = {}

    await fetch(`https://api.tvmaze.com/shows/${id}`)
            .then((response) => response.json())
            .then((res)=>{
                data = res
            })
            .catch(err =>{
                console.log(`[Error |fn showDetail data]\nCaused: ${err.messsage}`)

                data = {
                    error: `Error while fetching detail data, please try again after awhile`
                }
            })

    return {
        props: data
    }
}
