import networkx as nx


def build_graph(relationships: list) -> nx.Graph:
    """
    Build an intelligence graph from entity relationships.
    """

    graph = nx.Graph()

    for relationship in relationships:
        source = relationship["source"]
        target = relationship["target"]
        relation_type = relationship["relationship"]

        graph.add_node(source)
        graph.add_node(target)

        graph.add_edge(
            source,
            target,
            relationship=relation_type
        )

    return graph


def calculate_centrality(graph: nx.Graph) -> dict:
    """
    Calculate how important each entity is based on
    how connected it is to other entities.
    """

    return nx.degree_centrality(graph)