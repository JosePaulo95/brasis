import BoardModel from "@/Brasis/models/BoardModel";
import { Path } from "@/Brasis/models/Path";
import { Point } from "@/Brasis/models/Point";

export class Mapper {
    board_model: BoardModel;
    paths_table: Array<Array<Array<Path>>>;

    constructor (board_model: BoardModel) {
        this.board_model = board_model;
        this.paths_table = this.emptyPaths(board_model);
    }

    emptyPaths( board_model: BoardModel ): Path[][][] {
        const paths_table:Path[][][] = []
        
        for (let i = 0; i < board_model.default_board.length; i++) {
            paths_table.push([])
            for (let j = 0; j < board_model.default_board[i].length; j++) {
                paths_table[i].push([])
            }
        }
        
        return paths_table;
    }

    buildAllPaths( board_model: BoardModel ): Path[][][] {
        const paths_table:Path[][][] = []
        
        for (let i = 0; i < paths_table.length; i++) {
            for (let j = 0; j < paths_table[i].length; j++) {
                paths_table[i][j] = this.pathsFrom(board_model, i, j)
            }
        }
        
        return paths_table;
    }

    getPossibleMovesOf(x: number, y: number): Point[] {
        this.paths_table[x][y] = this.pathsFrom(this.board_model, x, y)
        const p = new Point(x,y)
        
        return this.paths_table[x][y]
            .filter(path => path.path.length<=3 && path.path.length>1)
            .filter(path => !this.board_model.actors_board.at(path.endpoint).value)
            .filter(path => !path.path.some(step => !this.board_model.actors_board.emptyOrSameTeam(p, step)))
            .map(path => path.endpoint)
    }

    getReachableEnemiesFrom (x: number, y: number, d=3): Point[] {
        const origin = new Point(x,y)
        this.paths_table[x][y] = this.pathsFrom(this.board_model, x, y)
        let reachable_enemies:Point[] = []

        const reachable_walking = this.paths_table[x][y]
            .filter(path => path.path.length<=d && path.path.length>1)
            .filter(path => path.path
                .every(step => this.board_model.actors_board.emptyOrSameTeam(origin, step))
            )
            .map(path => path.endpoint)
        
        const reachable_at_limit = this.paths_table[x][y]
        .filter(path => path.path.length<=d+1 && path.path.length>1)
        .filter(path => path.path.slice(0,-1)
            .every(step => this.board_model.actors_board.emptyOrSameTeam(origin, step))
        )
        .map(path => path.endpoint)

        reachable_enemies = reachable_enemies
        .concat(
            reachable_walking
        ).concat(
            reachable_at_limit
        ).filter(p => !this.board_model.actors_board.emptyOrSameTeam(origin, p))

        return reachable_enemies
    }

    pathsFrom (board_model: BoardModel, x: number, y: number): Path[] {
        const paths:Path[] = []
        const queue:Path[] = []
        const visited: Point[] = []
        const start_path:Path|undefined = new Path([new Point(x,y)])
        queue.push(start_path)

        while(queue.length > 0){
            let prev_path = queue.shift() as Path
            paths.push (prev_path)
            visited.push(prev_path.endpoint)
        
            let neighbors = board_model.getNeighbors(prev_path.endpoint)
            neighbors = neighbors.filter(n => !visited.some(p => p.match(n)))
            //neighbors = neighbors.filter(n => !queue.some(p=>p.endpoint.match(n)))
            neighbors.forEach(p => {
                queue.push(new Path([...prev_path.path, p]))
            });
        }
        return paths;
    }

    availableFrom (start: Point, d: number): Array<Point> {
        throw new Error("Method not implemented.");
        // const possible_destinies = this.getPaths(start, d).map(p => p.endpoint)
        // // possible_destinies = getPaths(start).filter(p=>p.blocking<=0).map(p => p.path[p.path.length-1])
        // return possible_destinies;
    }

    getPaths (p: Point, d: number): Array<Path> {
        throw new Error("Method not implemented.");
        //return this.paths[p.x][p.y].filter(p => p.path.length <= d)
    }

    getPath(a: Point, b: Point): Point[] {
        const path = this.paths_table[a.x][a.y].find(p => 
            p.endpoint.match(b) &&
            p.path.every(step => this.board_model.actors_board.emptyOrSameTeam(step, a))
        ) as Path
        return path.path;
    }
}