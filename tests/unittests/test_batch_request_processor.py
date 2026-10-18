from types import SimpleNamespace
from unittest.mock import patch

from bespokelabs.curator.request_processor.batch.anthropic_batch_request_processor import AnthropicBatchRequestProcessor


def test_set_model_cost_handles_missing_external_pricing():
    """Batch model cost setup should not fail when external pricing is unavailable."""
    tracker = SimpleNamespace(input_cost_per_million=0.0, output_cost_per_million=0.0, start_tracker=lambda _: None)
    processor = object.__new__(AnthropicBatchRequestProcessor)
    processor.tracker = tracker
    processor.prompt_formatter = SimpleNamespace(model_name="claude-3-5-sonnet-20241022")
    processor.config = SimpleNamespace(completion_window="*")
    processor._tracker_console = None

    with patch(
        "bespokelabs.curator.cost.external_model_cost",
        return_value={"input_cost_per_token": None, "output_cost_per_token": None},
    ):
        processor.set_model_cost()

    assert processor.tracker.input_cost_per_million is None
    assert processor.tracker.output_cost_per_million is None
