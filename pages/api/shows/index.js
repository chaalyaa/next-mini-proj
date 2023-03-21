import nc from 'next-connect';
import ErrorHandler from '@/src/assets/handler/error.handler';
import axios from 'axios';

import { TVMazeValidator } from '@/src/validator';

// [Task 4]: Request POST, GET, DELETE
const handler = nc(ErrorHandler);
handler
    /**
     * GET |Params:
     * -----------------------------------------
     * [Required] 
     * searchBy: [people, shows]
     * keySearch: Keyword to search
     */

    .get(
        TVMazeValidator.search,
        async(req, res)=>
        {
            try{
                let { searchBy, keySearch, showID } = req.query,
                    urlReq;

                switch(searchBy){
                    case "schedules":
                        urlReq = `schedule`
                    default:
                        urlReq = `search/${searchBy}`
                    break;
                }

                let [err, data] = await axios
                                .get(`https://api.tvmaze.com/${urlReq}`, {params: {q: keySearch}})
                                .then((res)=>{
                                    return [null, res.data]
                                }).catch((err)=>{
                                    console.log(`[Error |TVMaze get req]\nCaused: ${err.message}`);
                                    return [err,null]
                                })

                if(err) return res.status(400).json({rd: "01", rd: err?.message ?? `Error fetching data`})

                return res.status(200).json(data)

            } catch(err){
                return res.status(400)
                        .json({rc:"01", rd: err?.message ?? "Error exeption"})
            }
            

        }
    )
    .post((req, res)=>{
        return res.status(200).json({desc: "Request Method Post",...req.body});
    })
    .delete((req, res)=>{
        return res.status(200).json({desc: "Request Method Delete",...req.body});

    })

export default handler;