

export function BuildNodes(V) {
    let nodes = {};
    for (let i = 0; i < V.length; i++) {
        nodes[V[i].name] = {};
        nodes[V[i].name].name = V[i].name;
        nodes[V[i].name].capacity = V[i].capacity;
        nodes[V[i].name].usage = 0;
        nodes[V[i].name].edges = {};
    }
    return nodes;
}



// V: array of nodes
// E: array of edges
export function BuildGraph(V, E) {
    let graph = {};
    graph.nodes = BuildNodes(V);
    for (let i = 0; i < E.length; i++) {
        let edge = E[i];
        let u = edge.u;
        let v = edge.v;
        let len = edge.len;

        graph.nodes[u].edges[v] = len;
        graph.nodes[v].edges[u] = len;
    }
    // initialize routing table for each node
    for (let node in graph.nodes) {
        graph.nodes[node].routing = {};
        graph.nodes[node].routing[node] = 0;
        for (let dest in graph.nodes[node].edges) {
            graph.nodes[node].routing[dest] = graph.nodes[node].edges[dest];
        }
    }
    for (let i = 0; i < 2 * V.length; i++) {
        console.log()
        // update routing table of node from all neighbors
        // repeat until no change (at most |V| - 1 times)
        for (let node in graph.nodes) {
            for (let neighbor in graph.nodes[node].edges) {
                let len = graph.nodes[node].edges[neighbor];
                // total cost = distance + 100 * hops
                for (let dest in graph.nodes[neighbor].routing) {
                    if(dest == node)
                        continue;
                    let cost = len + graph.nodes[neighbor].routing[dest] + 100;
                    if (graph.nodes[node].routing[dest]===undefined ||  cost < graph.nodes[node].routing[dest]) {
                        graph.nodes[node].routing[dest] = cost;
                    }
                }
            }
        }
    }
    return graph;
}

export function FindRoute(graph, source, destination) {

    let totalVis = {}
    let visited = [];
    let stack = [];

    // for each node, try each neighbor recursively
    // in the order of increasing cost

    stack.push(source);
    visited.push({});
    totalVis[source] = true

    while (stack.length > 0) {
        // node is the top of the stack
        console.log(stack);
        let node = stack[stack.length - 1];
        if (node === destination) {
            break;
        }
        let neighbors = graph.nodes[node].edges;

        // sort neighbors by cost to destination
        let sortedNeighbors = Object.keys(neighbors).sort(function (a, b) {
            // console.log("A:",a,"B:",b,"Dest:",destination)
            let destA = graph.nodes[a].routing[destination] + graph.nodes[node].edges[a] + 100;
            let destB = graph.nodes[b].routing[destination] + graph.nodes[node].edges[b] + 100;
            return destA - destB;
            // return graph.nodes[a].routing[destination] - graph.nodes[b].routing[destination];
        });
        // console.log("node:",node);
        // console.log(sortedNeighbors);
        let TryNeighbor = null;
        for (let i = 0; i < sortedNeighbors.length; i++) {
            let neighbor = sortedNeighbors[i];
            if (totalVis[neighbor]) {
                continue;
            }
            if (visited[stack.length - 1][neighbor] || graph.nodes[neighbor].usage >= graph.nodes[neighbor].capacity) {
                continue;
            }
            TryNeighbor = neighbor;
            break;
        }

        if (TryNeighbor === null) {
            // backtrae
            totalVis[node]=null;
            stack.pop();
            visited.pop();
        } else {
            visited[visited.length - 1][TryNeighbor] = true;
            totalVis[TryNeighbor]=true;
            stack.push(TryNeighbor);
            visited.push({});
        }
    }


    if (stack.length === 0) {
        return { path: [], capacity: 0 };
    }
    // calculate capacity = min(remaining capacity of all nodes in the path)
    let capacity = Number.MAX_VALUE;
    for (let i = 0; i < stack.length; i++) {
        let node = graph.nodes[stack[i]];
        capacity = Math.min(capacity, node.capacity - node.usage);
    }

    return { path: stack, capacity: capacity };

}

export function ApplyRoute(graph, route, amount) {
    for (let i = 0; i < route.path.length; i++) {
        graph.nodes[route.path[i]].usage += amount;
    }
}

// graph: graph object
// contract: {source: string, destination: string, amount: number}
// return: remaining amount
export function NewContract(graph, contract) {
    console.log("contract:", contract)
    let remain = contract.amount
    let totalRoute = []
    while (remain > 0) {
        if(graph.nodes[contract.destination].usage >= graph.nodes[contract.destination].capacity)
        {
            break;
        }
        let route = FindRoute(graph, contract.source, contract.destination);
        if (route.capacity === 0) {
            break;
        }
        ApplyRoute(graph, route, Math.min(route.capacity, remain));
        totalRoute.push(route)
        console.log("当前已有路径：", totalRoute, "route:", route)
        remain -= Math.min(route.capacity, remain);
        console.log("remain:", remain)
    }
    return totalRoute
}