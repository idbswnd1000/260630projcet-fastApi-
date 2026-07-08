import graphene

from .graphqls.quries import Query
from .graphqls.mutations import Mutation

schema = graphene.Schema(query=Query, mutation=Mutation)
