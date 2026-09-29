For the refund in this article, **start with Postgres**. The customer balance, refund record, approval and retry identity are related business records. The application needs to change or check them together, then recover safely if the assistant loses the response.

“Lakebase versus document databases” mixes a managed service with a data model. Make two decisions instead: Postgres or document modelling for the refund, then which service should run it. Lakebase is a managed Postgres option when Databricks is already part of the stack. MongoDB or Cosmos DB can suit the case history, but the separate balance makes this refund more than one self-contained document.

> For this refund, start with Postgres; keep the external payment safe to retry.

## One refund, two shapes

Imagine a support assistant preparing a £40 refund. This is an illustrative design example, not a measured client result. The customer balance must change, the refund must be recorded and the approval must remain traceable. A retry must not pay twice.

In a relational design, customer, refund and approval records can remain separate, connected by keys and changed in [one Postgres transaction](https://www.postgresql.org/docs/current/tutorial-transactions.html). A unique business operation ID helps reject a duplicate request. A JSON field can hold the assistant's proposed explanation without making the whole application document-shaped. [Postgres supports both JSON storage and indexing](https://www.postgresql.org/docs/current/datatype-json.html). That keeps the money-moving state behind one consistency boundary.

In a document design, a bounded support case might keep its messages, proposed resolution and review state together. That fits an interface that repeatedly retrieves the whole case. Once the operation reaches a separately stored customer balance, however, the transaction boundary needs explicit design. The shape of the conversation is not necessarily the shape of the money movement. A case document can still be useful beside a relational refund ledger.

## Where Lakebase fits

[Lakebase is managed Postgres integrated with Databricks](https://docs.databricks.com/aws/en/oltp/projects/databricks-apps). It is one way to implement the recommended relational model, not a different data model from Postgres. Existing Databricks data and operations make it a relevant candidate, rather than a prerequisite for AI engineering.

If your organisation already depends on Databricks, evaluate the benefit of keeping operational and analytical workflows close. If it does not, compare an ordinary managed Postgres service too. Include regional availability, recovery requirements, authentication, connection behaviour and the workload's actual cost. A platform integration is valuable when it removes work your team really has.

## Where document databases fit

[MongoDB's modelling guidance](https://www.mongodb.com/docs/manual/data-modeling/) starts from access patterns: data read together is often stored together. That can suit varied case records or catalogues whose attributes change. MongoDB also supports [multi-document transactions](https://www.mongodb.com/docs/manual/core/transactions/); “documents cannot transact” would be the wrong comparison. If your refund system already uses MongoDB, prove the balance and refund update atomically before considering a migration.

For Azure Cosmos DB's document model, partitioning is central to the design. Its [transactional batches](https://learn.microsoft.com/en-us/azure/cosmos-db/transactional-batch) group operations sharing a logical partition key. If balance and refund span partition keys, that batch does not cover both; design another consistency mechanism or choose a different model. This discussion concerns that document model, not every database offering carrying the Cosmos name.

Neither document flexibility nor SQL removes the need for tenant isolation, validation, indexing and recovery. Compare the same reads, writes and failure cases before making performance or cost claims.

## Start with the transaction

Draw the refund on one page. Mark every record it changes, where authorisation is checked and what happens after a duplicate request. For the balance, refund and approval shown here, implement the core write as a Postgres transaction. If a payment provider is involved, that database transaction cannot make the external payment atomic: use the provider's idempotency mechanism and a recoverable workflow.

Then test the awkward case: the refund was accepted, but the response never reached the assistant. Can a retry discover the result safely? That experiment teaches more than an abstract SQL-versus-NoSQL scorecard. The [streaming and recovery guide](/articles/langchain-databricks-appkit-sse) follows this same refund through a disconnected browser.

Send the decision graphic to the person choosing your agent's data store. If you have a workflow to ship, bring its current database and the operation that must stay consistent. We can discuss a data model your team can operate.

[Discuss your agent data model →](https://ai.hyperdrift.io/?article=lakebase-vs-document-databases#contact)
