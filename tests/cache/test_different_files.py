import pytest
import os
from tests.test_helpers import run_script
from tests.test_helpers import prepare_test_cache

"""
USAGE:
pytest -s tests/cache/test_different_files.py
"""

@pytest.mark.cache_dir(os.path.expanduser("~/.cache/curator-tests/test-different-files"))
@pytest.mark.usefixtures("prepare_test_cache")
def test_cache_behavior():
    cache_hit_log = "Using cached output dataset."
    
    # Run one.py twice and check for cache behavior
    print("RUNNING ONE.PY")
    output1, _ = run_script(["python", "tests/cache_tests/different_files/one.py"])
    print(output1)
    assert cache_hit_log not in output1, "First run of one.py should not hit cache"
    
    print("RUNNING ONE.PY AGAIN")
    output2, _ = run_script(["python", "tests/cache_tests/different_files/one.py"])
    print(output2)
    assert cache_hit_log in output2, "Second run of one.py should hit cache"

    # Run two.py and check for cache behavior
    print("RUNNING TWO.PY")
    output3, _ = run_script(["python", "tests/cache_tests/different_files/two.py"])
    print(output3)
    assert cache_hit_log in output3, "First run of two.py should hit cache"
